var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose>
          <Modal condition={true}/>
        </Choose>
      </div>
    );
  }
};
