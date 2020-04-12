//import { checkNetworkConnection } from './utils';


const baseURL = "http://13.232.62.239:6565/api/user";

//const baseURL = "http://192.168.0.17:3003/api/";

const catelogBaseUR = "http://13.232.198.132:3004/api/";

//const catelogBaseUR ="http://192.168.0.106:3004/api/";


//employees
export function postAPI(endpoint, data, token) {
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(baseURL + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}


//GET API

export function getAPI(endpoint, token) {
    console.log(baseURL + endpoint)
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(baseURL + endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'token': token
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        console.log("reject: " + reject);
    })
}


//PUT API

export function putAPI(endpoint, data, token) {
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(baseURL + endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}
//PUT API for return of product
export function putAPIReturn(endpoint, data, token) {
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}

//GET Catelog API

export function getCatelogAPI(endpoint, token) {
    console.log('Hitting getCatelog api-------------->' + catelogBaseUR + endpoint)
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'token': token
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        console.log("reject: " + reject);
    })
}


//post catelog

export function postCatelogAPI(endpoint, data, token) {
    console.log(catelogBaseUR + endpoint)
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}
//Delete catelog API

export function deleteCatelogAPI(endpoint, data, token) {
    console.log(catelogBaseUR + endpoint)
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}
//Delete API

export function deleteAPI(endpoint, data, token) {
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(baseURL + endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        alert("reject: " + reject);
    })
}


// export function getAccessToken(realmObj){
//  var accessToken;
//  realmObj.forEach((item, index)=>{
//       accessToken=item.access_token;
//     })

//     return accessToken;
// }


//   export function getUserLength(realmObj){
//               return new Promise((resolve,reject)=>{
//                   resolve(realmObj.objects('User').length);
//               })
//    }

export function getSpecifications() {
    console.log('Hitting getSpecifications Api' + catelogBaseUR + endpoint)
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        console.log("rejecting getSpecifications Api:" + reject)
    })

}

//Updated by Vaishnavi

export function Api(parameters, apiMethod, variables) {

    const siteUrl = "http://13.232.62.239:6565/api/user";
    var init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            // 'Authorization': token
            'Content-Type': 'application/json'
        },
    } :
        {
            method: apiMethod,
            headers: {
                // 'Authorization': token
                'Content-Type': 'application/json',
                //'credentials':'include'
            },
            body: JSON.stringify(variables)
        }
    console.log(siteUrl + parameters + JSON.stringify(init));
    return fetch(siteUrl + parameters, init)
        .then(res => res.json().then(data => {
            console.log(res.status + "data" + JSON.stringify(data));
            // if (res.status == 200 || res.status == 201) {
            var apiData = {
                status: res.status,
                data: data
            }

            console.log("DATA--->>" + JSON.stringify(apiData))
            return apiData;
        }))
        .catch(err => {
            console.log("err" + JSON.stringify(err))
            //  alert("Something went wrong. Please try again.");
            return "error"
        });

};

export function getCategorylogAPI(endpoint, data, token) {
    console.log('Hitting getCatelog api-------------->' + catelogBaseUR + endpoint)
    var dataToPost = JSON.stringify(data);
    return checkNetworkConnection().then((networkStatus) => {
        if (networkStatus) {
            return fetch(catelogBaseUR + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'token': token
                },
                body: dataToPost
            })
                .then((response) => {
                    return response.json()
                }
                )
                .then((responseJson) => {
                    return new Promise((resolve, reject) => {
                        resolve(responseJson)
                    })
                })
        }
        else {
            return new Promise((resolve, reject) => {
                reject({ message: "Network unavailable. Please connect to a Wi-Fi or cellular network." })
            })
        }
    }, (reject) => {
        console.log("reject: " + reject);
    })
}




