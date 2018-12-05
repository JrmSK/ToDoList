class List extends React.Component {
    constructor(props) {
        super(props);
    }

    generateActivityString(activity) {
        var date = date_utils.parseDate(activity.day, activity.month, activity.year);
        var new_activity = `${activity.name} on ${date}`;
        return new_activity;
    }

    render() {
        return (
            <ul>
                {this.props.activities.map((activity, i) => <li key={i}>{this.generateActivityString(activity)}</li>)}
            </ul>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(event) {
        event.preventDefault();
        var new_activity = {
            name: this.name.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        };
        this.state.activities.push(new_activity);
        this.setState({ activities: this.state.activities });
    }

    renderOptions(arr) {
        return arr.map(x => <option key={x} value={x}>{x}</option>);
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={input => this.name = input} placeholder="Enter something ToDo" />
                        <select ref={x => this.day = x}>
                            {this.renderOptions(date_utils.days)}
                        </select>
                        <select ref={x => this.month = x}>
                            {this.renderOptions(date_utils.months)}
                        </select>
                        <select ref={x => this.year = x}>
                            {this.renderOptions(date_utils.years)}
                        </select>
                        <input type="submit" value="add"></input>
                    </form>
                </div>
                <div className="toDoContainer">
                    <List activities={this.state.activities} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);