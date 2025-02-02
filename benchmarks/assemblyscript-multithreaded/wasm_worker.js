onmessage = ({data}) => {
    const {n_worker, n_threads, memory, width, height, ITER_CONST, START_X_TOTAL, START_Y_TOTAL, WINDOW, mod} = data;
    WebAssembly.instantiate( 
    mod, {
		env: {
            abort: () => console.log("Abort!"),
            memory: memory,
            log: (message) => console.log(message)
        },
        mandel_final: {
            canvas_width: width,
            canvas_height: height,
            DIV_CLASS: n_worker,
            N_THREADS: n_threads,
            ITER_CONST,
            START_X_TOTAL,
            START_Y_TOTAL,
            WINDOW
        }
    }).then(results => {
        postMessage("done")
    })
}
