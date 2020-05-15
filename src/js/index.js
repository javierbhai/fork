// Global app controller
import Search from '../models/Search'
import Recipe from '../models/Recipe'
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


/*
Search  controler
 */
const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput()
    //console.log(query)

    if (query) {
        //new search obj and add it to state
        state.search = new Search(query);

        //prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try {
            //search for recipes
            await state.search.getResults()

            //render results on UI
            console.log('hola', state.search.result)
            clearLoader();
            searchView.renderResults(state.search.result)
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
    // console.log('Submited')
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


// import * as searchView from "../views/searchView";
// import { add as a, multiply  } from "../views/searchView";
// console.log(`${searchView.add(2,4)} and also ${searchView.multiply(3,4)}`)
// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

/*
Recipie
 */

const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id)
    
    if (id) {
        // Prepare UI for changes


        // Create new recipe object
        state.recipe = new Recipe(id)

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe)

        } catch (error) {
            alert('wrong wrong...')
        }


    }
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)

['hashchange', 'load'].forEach( event => window.addEventListener(event, controlRecipe))


 const r = new Recipe(47746);

r.getRecipe()