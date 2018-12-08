class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            placeholder: "Enter something ToDo",
            doneActivities: [],
            toDoActivities: [],
            counter: 0,
            isOpen: false,
            activityContent: "",
        };
        this.addItem = this.addItem.bind(this);
        this.moveToDoneList = this.moveToDoneList.bind(this);
        this.moveToToDoList = this.moveToToDoList.bind(this);
        this.delete = this.delete.bind(this);
        this.setFavorite = this.setFavorite.bind(this);
        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.playSound = this.playSound.bind(this);
        this.toggleModal = this.toggleModal.bind(this);


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
        this.playSound("done");
    }

    /* Reset a done list item to the ToDo list */
    moveToToDoList(e) {
        e.target.parentElement.remove();
        this.state.toDoActivities.push(e.target.parentElement.textContent);
        this.setState({
            toDoActivities: this.state.toDoActivities,
        })
        this.playSound("recycle");
    }

    delete(e) {
        e.target.parentElement.remove();
        this.playSound("trash");

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
            this.playSound("star");                                     // issue here
        }
    }

    playSound(type) {
        document.getElementById("sound").src = `./sound/${type}.mp3`;
        document.getElementById("sound").play();
    }

    toggleModal(e) {
        this.setState({
            isOpen: !this.state.isOpen,
            activityContent: e.target.parentElement.textContent
        });
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
                    <ToDoList activities={this.state.activities} toDoActivities={this.state.toDoActivities} handleDelete={this.delete} handleFavorite={this.setFavorite} handleModal={this.toggleModal} handleClick={this.moveToDoneList} />
                </div>
                <h2 className="title">Done</h2>
                <div className="done-Container">
                    <DoneList doneActivities={this.state.doneActivities} handleClick={this.moveToToDoList} handleDelete={this.delete} />
                </div>
                <Modal show={this.state.isOpen} onClose={this.toggleModal} contentHandle={this.state.activityContent} handleSound={this.playSound} />
            </div>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.selectDelete = this.selectDelete.bind(this);
        this.selectFavorite = this.selectFavorite.bind(this);
        this.openModal = this.openModal.bind(this);
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

    selectFavorite(e) {
        this.props.handleFavorite(e);
    }

    openModal(e) {
        this.props.handleModal(e);
    }

    render() {
        return (
            <ul id="toDo-Container">
                {/* Will generate Todo's from user input */}
                {this.props.activities.map((activity, i) => <li key={i}>
                    <input className="inputImage" onClick={this.select} type="image" src="./images/tick.png" />
                    <input className="inputImage" onClick={this.selectFavorite} type="image" src="./images/star.png" />
                    <input className="inputImage" onClick={this.selectDelete} type="image" src="./images/bin.png" />
                    <input className="inputImage clock" onClick={this.openModal} type="image" src="./images/clock.png" />
                    {this.generateActivityString(activity)}</li>

                )}
                {/* Will generate Todo's from reset of done list item  */}
                {this.props.toDoActivities.map((i) => <li key={i.index}>
                    <input className="inputImage" onClick={this.select} type="image" src="./images/tick.png" />
                    <input className="inputImage" onClick={this.selectFavorite} type="image" src="./images/star.png" />
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

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 5,
        }
        this.alarmSet = this.alarmSet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.playSound = this.playSound.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        })
    }

    /* Set the alarm for the selected activity, with the selected amount of time */
    alarmSet() {
        var that = this;
        var activity = this.props.contentHandle
        setTimeout(function () {
            that.playSound("star");
            var aud = document.getElementById("sound");
            aud.onended = function () {                     // this was necessary because otherwise the sound was played after the alert 
                alert(`dont forget: ${activity}`);
            }
        }, (this.state.value * 60000))
    }

    playSound(arg) {
        this.props.handleSound(arg);
    }

    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop" className="modal-backdrop">
                <div className="modal">
                    <p>When shall I remind you of your task?</p>
                    <select className="modal-element" value={this.state.value} onChange={this.handleChange} selected={1} id="time-selected">
                        <option value={1}>1mn</option>
                        <option value={5}>5mn</option>
                        <option value={10}>10mn</option>
                        <option value={60}>1h</option>
                        <option value={120}>2h</option>
                        <option value={1440}>1 day</option>
                    </select>
                    <input className="modal-element" type="button" onMouseDown={this.alarmSet} onClick={this.props.onClose} value="remind me" />
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);