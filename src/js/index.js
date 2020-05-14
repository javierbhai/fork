// Global app controller
import Search from '../models/Search'
import * as searchView from '../views/searchView'
import {elements, renderLoader, clearLoader} from '../views/base'


/*
Global state o app
-- Search Obbject
-- Current recipe object
-- shoping list
-- liked recipes
*/

const state = {}

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput()
    console.log(query)

    if (query) {
        //new search obj and add it to state
        state.search = new Search(query);

        //prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        //search for recipes
        await state.search.getResults()

        //render results on UI
        console.log('hola', state.search.result)
        clearLoader()
        searchView.renderResult(state.search.result, 10, 1)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
    console.log('Submited')
})



// import * as searchView from "../views/searchView";
// import { add as a, multiply  } from "../views/searchView";
// console.log(`${searchView.add(2,4)} and also ${searchView.multiply(3,4)}`)
// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

