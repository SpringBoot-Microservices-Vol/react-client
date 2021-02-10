import {API} from "../utils/API";

export function addCandidateToCategoryName(candidate, categoryName) {
    API.get('categories').then(({data}) => {
        let category = data.find(data => data.name = categoryName);
        console.log(category);
        candidate.categoryDTO = category;
        API.post('candidates', candidate).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        return data;
    });
}


export function getCategoriesName(data) {
    let result = Object.keys(data).map(function (key) {
        return [data[key].name].toString();
    });
    return result;
}