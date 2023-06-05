var resolveAfter2Seconds = function () {
  console.log("Initialisation de la promesse lente");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("lente");
      console.log("La promesse lente est terminée");
    }, 2000);
  });
};

var resolveAfter1Seconds = function () {
  console.log("Initialisation de la promesse rapide");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("rapide");
      console.log("La promesse rapide est terminée");
    }, 1000);
  });
};

var sequentialStart = async function () {
  console.log("== Début séquentiel==");

  const lente = await resolveAfter2Seconds();
  console.log(lente);

  const rapide = await resolveAfter1Seconds();
  console.log(rapide);
};

var concurrentStart = async function () {
  console.log("== Debut concurrentiel avec await ==");
  const lente = resolveAfter2Seconds();
  const rapide = resolveAfter1Seconds();

  console.log(await lente);
  console.log(await rapide);
};


var concurrentPromise = function() {
    console.log("== Début concurrentiel avec Promise.all==")
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Seconds()]).then((message)=> {
        console.log(message[0])
        console.log(message[1])
    })
}


var parallel = async function () {
    console.log("== Exécution en parallele avec awail Promise.all")
    await Promise.all([
        (async() => console.log(await resolveAfter2Seconds()))()
        (async() => console.log(await resolveAfter1Seconds()))()
    ])
}

var parallelPromise = function() {
    console.log("== Exécution parallele avec des Promise.then==")
    resolveAfter2Seconds().then((message) => console.log(message))
    resolveAfter1Seconds().then((message) => console.log(message))
}

setTimeout(concurrentPromise, 7000);
