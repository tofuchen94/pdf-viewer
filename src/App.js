import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist/webpack";
import "./App.css";

function App() {
    const canvas = useRef();
    console.log(pdfjs);
    useEffect(() => {
        const url = "test.pdf";
        let loadingTask = pdfjs.getDocument(url);
        loadingTask.promise.then(
            (doc) => {
                console.log(`Document ${url} loaded ${doc.numPages} page(s)`);
                doc.getPage(1).then((page) => {
                    console.log("Page loaded");
                    console.log(doc);
                    let scale = 1.5;
                    let viewport = page.getViewport({ scale: scale });
                    let context = canvas.current.getContext("2d");
                    canvas.current.width = viewport.width;
                    canvas.current.height = viewport.height;
                    var renderContext = {
                        canvasContext: context,
                        viewport,
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        console.log("Page rendered");
                    });
                });
            },
            (reason) => {
                console.error(`Error during ${url} loading: ${reason}`);
            }
        );
    });

    return (
        <div className="App">
            <canvas ref={canvas}></canvas>
        </div>
    );
}

export default App;
