class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            placeholder: "Enter something ToDo",
            doneActivities: [],
            toDoActivities: [],
            counter: 0
        };
        this.addItem = this.addItem.bind(this);
        this.moveToDoneList = this.moveToDoneList.bind(this);
        this.moveToToDoList = this.moveToToDoList.bind(this);
        this.delete = this.delete.bind(this);
        this.changeDateFormat = this.changeDateFormat.bind(this);

    }

    /* Create a ToDo Item and add it to the todolist as well as this.state.activities */
    addItem(e) {
        e.preventDefault();
        var new_activity = {
            name: this.name.value,
            date: this.changeDateFormat(this.date.value)
        };
        if (this.name.value !== "") {
            this.state.activities.push(new_activity);
            this.setState({
                activities: this.state.activities,
            });
            document.getElementById('inputContent').value = "";
        } else {
            this.setState({
                placeholder: "Enter at least one character"
            })
        }
    }

    /* Change date's format to DD/MM/YYYY */
    changeDateFormat(date) {
        var correctDate = `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`
        if (correctDate === "//") {
            correctDate = "";
        }
        return correctDate;
    }

    /* Destroy a ToDo item, and create a new one in the done list */
    moveToDoneList(e) {
        e.target.parentElement.remove();
        this.state.doneActivities.push(e.target.parentElement.textContent);
        this.setState({
            doneActivities: this.state.doneActivities,
            counter: this.state.counter + 1
        })
    }

    /* Reset a done list item to the ToDo list */
    moveToToDoList(e) {
        e.target.parentElement.remove();
        this.state.toDoActivities.push(e.target.parentElement.textContent);
        this.setState({
            toDoActivities: this.state.toDoActivities,
        })
    }

    delete(e) {
        e.target.parentElement.remove();
    }

    render() {
        return (
            <div className="container">
                <div className="header-title">
                    <h1 className="title">ToDo List</h1>
                </div>
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input id="inputContent" className="todoInput" ref={input => this.name = input} placeholder={this.state.placeholder} />
                        <br />
                        <input type="date" className="dateInput" ref={input => this.date = input} />
                        <button className="button-submit" type="submit" >Add</button>
                    </form>
                </div>
                <h2 className="title">To Do</h2>
                <div className="toDo-Container">
                    <ToDoList activities={this.state.activities} toDoActivities={this.state.toDoActivities} handleDelete={this.delete} handleClick={this.moveToDoneList} />
                </div>
                <h2 className="title">Done</h2>
                <div className="done-Container">
                    <DoneList doneActivities={this.state.doneActivities} handleClick={this.moveToToDoList} handleDelete={this.delete} />
                </div>
            </div>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.selectDelete = this.selectDelete.bind(this);
        this.state = {
            toDoActivities: this.props.toDoActivities,
        }
    }

    /* Combines user's input and selected date */
    generateActivityString(activity) {
        var new_activity = `${activity.name} ${activity.date}`;
        return new_activity;
    }


    select(e) {
        this.props.handleClick(e);
    }

    selectDelete(e) {
        this.props.handleDelete(e);
    }

    /* Give or remove favorite classname to selected ToDo item */
    setFavorite(e) {
        var text = e.target.parentElement;
        if (e.target.parentElement.classList.contains("favorite")) {
            document.getElementById("toDo-Container").append(text);
            e.target.parentElement.classList.remove("favorite");
        } else {
            e.target.parentElement.classList.add("favorite");
            document.getElementById("toDo-Container").prepend(text);
        }
    }


    render() {
        return (
            <ul id="toDo-Container">
                {/* Will generate Todo's from user input */}
                {this.props.activities.map((activity, i) => <li key={i}>
                    <input className="inputImage" onClick={this.select} type="image" src="./images/tick.png" />
                    <input className="inputImage" onClick={this.setFavorite} type="image" src="./images/star.png" />
                    <input className="inputImage" onClick={this.selectDelete} type="image" src="./images/bin.png" />{this.generateActivityString(activity)}</li>
                )}
                {/* Will generate Todo's from reset of done list item  */}
                {this.props.toDoActivities.map((i) => <li key={i.index}>
                    <input className="inputImage" onClick={this.select} type="image" src="./images/tick.png" />
                    <input className="inputImage" onClick={this.setFavorite} type="image" src="./images/star.png" />
                    <input className="inputImage" onClick={this.selectDelete} type="image" src="./images/bin.png" />{i}</li>
                )}
            </ul>
        );
    }
}

class DoneList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doneActivities: this.props.doneActivities,
        }
        this.select = this.select.bind(this);
        this.selectDelete = this.selectDelete.bind(this);
    }

    select(e) {
        this.props.handleClick(e);
    }

    selectDelete(e) {
        this.props.handleDelete(e);
    }

    render() {
        return (
            <ul>
                {this.props.doneActivities.map((i) => <li key={i.index}>
                    <input onClick={this.select} className="inputImage" type="image" src="./images/redo.png" />
                    <input onClick={this.selectDelete} className="inputImage" type="image" src="./images/bin.png" />{i}</li>
                )}
            </ul>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);