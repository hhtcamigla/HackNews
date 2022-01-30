import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import { all, fork } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import { Alert } from 'react-native';
import { StoryInfo, UserInfo } from '../types';

export type AppStateData = {
    topStories: number[]
    stories: Map<string,StoryInfo>
    users: Map<string,UserInfo>
}

export type ResponseData = {
    data: any
}

enum actions {
    FETCH_STORIES = 'FETCH_STORIES',
    SAVE_STORIES = 'SAVE_STORIES',    
    FETCH_STORY = 'FETCH_STORY',
    SAVE_STORY = 'SAVE_STORY',    
    FETCH_USER = 'FETCH_USER',
    SAVE_USER = 'SAVE_USER'
} 

const initialState: AppStateData = {
    topStories: [],
    stories: new Map<string,StoryInfo>(),
    users: new Map<string,UserInfo>()
}

export const fetchStories = () =>{
    return {
        type: actions.FETCH_STORIES
    }
}    

export const saveStories = (payload: any) =>{
    return {
        type: actions.SAVE_STORIES,
        payload,
    }
}    

export const fetchStory = (storyId: number) =>{
    return {
        type: actions.FETCH_STORY,
        payload: {storyId}
    }
}    

export const saveStory = (payload: any) =>{
    return {
        type: actions.SAVE_STORY,
        payload,
    }
}    

export const fetchUser = (userName: string) =>{
    return {
        type: actions.FETCH_USER,
        payload: {userName}
    }
}    

export const saveUser = (payload: any) =>{
    return {
        type: actions.SAVE_USER,
        payload,
    }
}    

const appReducer = (state = initialState, action: any) => {

    switch(action.type) {
        case actions.SAVE_STORIES: {
            let ids: number[] = action.payload
            return {...state, topStories: ids}
        }
        case actions.SAVE_STORY: {
            let stories = state.stories 
            let story = action.payload

            return {...state, stories: {...stories, ...story}}
        }
        case actions.SAVE_USER: {
            let users = state.users
            let user = action.payload
            return {...state, users: {...users, ...user}}
        }
 
        default:
            return state
    }
}


const AppReducer = combineReducers(
        { appReducer }
    );


export const configureStore = () => { 
        return createStore(AppReducer);
    }

 const executeAPI = async (param: string) => {
  
        try {
          
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/${param}.json`
          )
          
          let responseJSON = await response.json()
          return {data: responseJSON};
        }
        catch (error: any) {
            console.log(error)
        }
      
    }
      

function* appSaga(param: any) {
    const {type, payload}  = param

    let response: ResponseData 
    switch(type) {
        case actions.FETCH_STORIES: {
            response = yield call(executeAPI, 'topstories');
            const ids: number[] = response.data

            let uniqueIDs: number[] = []

            while(uniqueIDs.length < 10) {
                const index = Math.floor(Math.random()*ids.length)
                let id = ids[index]
                if(uniqueIDs.indexOf(id) === -1) {
                    uniqueIDs.push(id)
                }
            }

            yield put(saveStories(uniqueIDs))

            for( var index=0; index < 10; index++ ) {
                yield put(fetchStory(uniqueIDs[index]))
            }
            
            break
        }
        case actions.FETCH_STORY: {
            const {storyId} = payload
            response = yield call(executeAPI, `item/${storyId}`)
            yield put(saveStory({[storyId]: response.data}))
            const {by} = response.data
            yield put(fetchUser(by))
            break
        }
        case actions.FETCH_USER: {
            const {userName} = payload
            response = yield call(executeAPI, `user/${userName}`)
            yield put(saveUser({[userName]:response.data}))
        }
    }
}

export function* watchSaga() {
    yield takeLatest(actions.FETCH_STORIES, appSaga);
    yield takeEvery(actions.FETCH_STORY, appSaga);
    yield takeEvery(actions.FETCH_USER, appSaga);
}
 
export function* rootSaga(){    
    yield all([
        fork(watchSaga)
    ])
}


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
  
const persistedRecuder = persistReducer(persistConfig, appReducer);
export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedRecuder, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

