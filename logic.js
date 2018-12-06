class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            placeholder: "Enter something ToDo",
            doneActivities: []
        };
        this.addItem = this.addItem.bind(this);
        this.moveToDoneList = this.moveToDoneList.bind(this)
    }

    /* Create a ToDo Item and add it to the todolist as well as this.state.activities */
    addItem(event) {
        event.preventDefault();
        var new_activity = {
            name: this.name.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        };
        this.state.activities.push(new_activity);
        this.setState({
            activities: this.state.activities
        });
    }

    moveToDoneList(e) {
        e.target.parentElement.classList.add("done");
        this.state.doneActivities.push(e.target.parentElement)
        this.setState({
            doneActivities: this.state.doneActivities,
        })
        console.log(this.state.doneActivities);
    }

    /* Create drop down options */
    renderOptions(arr) {
        return arr.map(x => <option key={x} value={x}>{x}</option>);
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    <h1>ToDo List</h1>
                </div>
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input className="todoInput" ref={input => this.name = input} placeholder="Enter something ToDo" />
                        <br />
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
                <div className="toDo-Container">
                    <ToDoList activities={this.state.activities} handleClick={this.moveToDoneList} />
                </div>
                <div className="done-Container">
                    {/* <DoneList/> */}
                </div>
            </div>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    generateActivityString(activity) {
        var date = date_utils.parseDate(activity.day, activity.month, activity.year);
        var new_activity = `${activity.name} on ${date}`;
        return new_activity;
    }
    select(e){
        this.props.handleClick(e);
    }

    render() {
        return (
            <ul>
                {this.props.activities.map((activity, i) => <li key={i}>{this.generateActivityString(activity)}<button onClick={this.select} >Done !</button></li>)}
            </ul>
        );
    }
}

// class DoneList extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     generateActivityString(activity) {
//         var date = date_utils.parseDate(activity.day, activity.month, activity.year);
//         var new_activity = `${activity.name} on ${date}`;
//         return new_activity;
//     }

//     render() {
//         return (
//             <ul>
//                 {this.props.activities.map((activity, i) => <li key={i}>{this.generateActivityString(activity)}</li>)}
//             </ul>
//         );
//     }
// }

ReactDOM.render(
    <App />,
    document.getElementById("root")
);