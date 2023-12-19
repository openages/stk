import { debounce } from 'lodash-es'

const addEventListeners = (object: typeof window | typeof document, events: Array<string>, callback: () => any) => {
	events.forEach(event => {
		object.addEventListener(event, debounce(callback, 900, { leading: true }))
	})
}

const removeEventListeners = (object: typeof window | typeof document, events: Array<string>, callback: () => any) => {
	events.forEach(event => {
		object.removeEventListener(event, debounce(callback, 900, { leading: true }))
	})
}

type MaybePromise<T> = T | Promise<T>

interface Options<T = {}> {
	/**
	 * Context is caller`s this
	 */
	context?: T
	/**
	 * Idle time in ms.
	 *
	 * @default 60000
	 */
	time?: number
	/**
	 * Events that will trigger the idle resetter.
	 *
	 * @default ['mousemove','scroll','keydown','mousedown','touchstart']
	 */
	events?: string[]
	/**
	 * Callback function to be executed after idle time.
	 */
	onIdle?: () => MaybePromise<any>
	/**
	 * Callback function to be executed after back form idleness.
	 */
	onActive?: () => MaybePromise<any>
	/**
	 * Callback function to be executed when window become hidden.
	 */
	onHide?: () => MaybePromise<any>
	/**
	 * Callback function to be executed when window become visible.
	 */
	onShow?: () => MaybePromise<any>
}

export default class Index<T = {}> {
	settings = {
		context: null,
		time: 60000,
		events: ['mousemove', 'scroll', 'keydown', 'mousedown', 'touchstart'],
		onIdle: null,
		onActive: null,
		onHide: null,
		onShow: null
	} as Options<T>

	idle = false
	visible = true
	clearTimeout = null

	constructor(options: Options<T>) {
		this.settings = Object.assign(this.settings, options)
	}

	public start() {
		this.startTimer()

		addEventListeners(window, this.settings.events, this.active.bind(this))

		if (this.settings.onShow || this.settings.onHide) {
			addEventListeners(document, ['visibilitychange'], this.show.bind(this))
		}
	}

	public stop() {
		if (this.clearTimeout) {
			this.clearTimeout()

			this.clearTimeout = null
		}

		removeEventListeners(window, this.settings.events, this.active.bind(this))

		if (this.settings.onShow || this.settings.onHide) {
			removeEventListeners(document, ['visibilitychange'], this.show.bind(this))
		}
	}

	private active() {
		if (this.idle) {
			this.idle = false

			this.settings.onActive && this.settings.onActive.call(this.settings.context ?? this)
		}

		this.resetTimer()
	}

	private show() {
		if (document.hidden) {
			if (this.visible) {
				this.visible = false
				this.settings.onHide && this.settings.onHide.call(this.settings.context ?? this)
			}
		} else {
			if (!this.visible) {
				this.visible = true
				this.settings.onShow && this.settings.onShow.call(this.settings.context ?? this)
			}
		}
	}

	private startTimer() {
		const timer = setTimeout(() => {
			this.idle = true
			this.settings.onIdle && this.settings.onIdle.call(this.settings.context ?? this)
		}, this.settings.time)

		this.clearTimeout = () => clearTimeout(timer)
	}

	private resetTimer() {
		if (this.clearTimeout) {
			this.clearTimeout()
			this.clearTimeout = null
		}

		this.startTimer()
	}
}
