const initialState = {
   newsList: [
       {
           id: 1,
           isApproved: true,
           owner: "User",
           title: "Новость 1",
           description: "Описание новости 1",
           date: "15-09-2020 16-47"
       },
       {
           id: 2,
           isApproved: false,
           owner: "User",
           title: "Новость 2",
           description: "Описание новости 2",
           date: "15-09-2020 16-50"
       },
       {
           id: 3,
           isApproved: false,
           owner: "SomeUser",
           title: "Новость 3",
           description: "Описание новости 3",
           date: "15-09-2020 17-12"
       }
   ]
};

export const news = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_NEWS':
            const allNews = state.newsList.slice();
            allNews.push(action.payload);
            return {...state, newsList: allNews};

        case 'DELETE_NEWS':
            return {...state, newsList: state.newsList.filter(item => item.id !== action.payload)};

        case 'APPROVE_NEWS':
            const idx = state.newsList.findIndex(item => item.id === action.payload);
            const newList = state.newsList.slice();
            newList[idx].isApproved = true;
            return {...state, newsList: newList};

        default:
            return state;
    }
};