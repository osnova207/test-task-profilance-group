import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from 'moment';
import MainPage from "./components/MainPage"
import NewsPage from "./components/NewsPage"
import Header from "./components/Header";
import { connect } from "react-redux";
import * as appActions from "./actions/app";
import * as newsActions from "./actions/news";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import AddNews from "./components/AddNews";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
        }
    }

    getMainPageContent = () => {
        return this.props.isLogged ? `Привет, ${this.props.activeUser.login}` : "Привет, гость"
    };

    toggleLogin = () => {
        const { isLogged, dispatch } = this.props;

        if (isLogged) {
            dispatch(appActions.setLogOut())
        } else {
            dispatch(appActions.openLoginModal())
        }
    };

    onLogIn = (values) => {
        const {login, password} = values;
        const currentUser = this.props.usersList.find((user) => user.login === login);

        if (!currentUser) {
            toast.error('Указанного пользователя не существует!');
            return;
        } else if (currentUser && currentUser.password !== password) {
            toast.error('Неверный пароль');
            return;
        }

        this.props.dispatch(appActions.setLogIn(currentUser));
        toast.success('Добро пожаловать!')
    };

    deleteNews = (id) => {
        this.props.dispatch(newsActions.toDeleteNews(id));
        toast.error('Новость удалена!')
    };

    approveNews = (id) => {
        this.props.dispatch(newsActions.toApproveNews(id));
        toast.success('Новость одобрена!')
    };

    changeSearch = (searchKey) => {
        this.setState({searchKey})
    };

    getVisibleList = (list, key) => {
        const { isLogged, activeUser } = this.props;
        let resultList;

        if (!isLogged) {
            resultList = list.filter(item => item.isApproved)
        } else if (activeUser.isAdmin) {
            resultList = list
        } else {
            resultList = list.filter(item => item.isApproved || item.owner === activeUser.login)
        }

        return resultList.filter((item) => (item.description.indexOf(key) > -1 || item.title.indexOf(key) > -1));
    };

    onSaveNews = (values) => {
        const { title, description } = values;
        const { newsList } = this.props;
        this.props.dispatch(newsActions.toAddNews({
            id: newsList.length ? newsList.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1 : 1,
            isApproved: false,
            owner: this.props.activeUser.login,
            title: title,
            description: description,
            date: moment(new Date()).format("DD-MM-YYYY HH-mm")
        }));
        this.props.dispatch(appActions.closeAddNewsModal());
        toast.success('Новость успешно добавлена!');
    };

    render() {
        const {isShowLoginModal, isShowAddNewsModal, isLogged, newsList, activeUser} = this.props;
        const visibleList = this.getVisibleList(newsList, this.state.searchKey);

        return (
            <div className="App">
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    draggable
                    pauseOnHover
                />

                <Router>
                    <Header isLogged={isLogged} toggleLogin={() => this.toggleLogin()}/>
                    <Switch>
                        <Route path="/" exact
                            render={() => <MainPage content={this.getMainPageContent()}/>}
                        />
                        <Route path="/news"
                            render={() => <NewsPage
                                list={visibleList}
                                onDelete={this.deleteNews}
                                onApprove={this.approveNews}
                                onChangeSearch={this.changeSearch}
                                onOpenAddNewsModal={() => this.props.dispatch(appActions.openAddNewsModal())}
                                isLogged={isLogged}
                                isAdmin={isLogged ? activeUser.isAdmin : false}
                            />}
                        />
                        <Route
                            render={() => <h1>Page not found...</h1>}
                        />
                    </Switch>
                </Router>

                {isShowLoginModal &&
                <Login
                    onLogIn={this.onLogIn}
                    onClose={() => this.props.dispatch(appActions.closeLoginModal())}
                />}

                {isShowAddNewsModal &&
                <AddNews
                    onSave={this.onSaveNews}
                    onClose={() => this.props.dispatch(appActions.closeAddNewsModal())}
                />}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {isLogged, isShowLoginModal, isShowAddNewsModal, usersList, activeUser} = state.app;
    return {
        isLogged,
        isShowLoginModal,
        isShowAddNewsModal,
        usersList,
        activeUser,
        newsList: state.news.newsList
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
