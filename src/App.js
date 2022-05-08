import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist/webpack";
import {
    PDFLinkService,
    PDFViewer,
    PDFFindController,
    EventBus,
    PDFScriptingManager,
} from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import "./App.css";

function App() {
    const canvas = useRef();
    const viewerContainer = useRef();
    console.log(pdfjs);
    useEffect(() => {
        (async () => {
            const url = "test.pdf";
            const eventBus = new EventBus();
            const linkService = new PDFLinkService({
                eventBus,
            });
            const findController = new PDFFindController({
                eventBus,
                linkService,
            });
            const newViewer = new PDFViewer({
                container: viewerContainer.current,
                eventBus,
                linkService,
                findController,
            });
            linkService.setViewer(newViewer);
            newViewer.currentScaleValue = "page-width";
            let doc = await pdfjs.getDocument(url).promise;
            let outline = await doc.getOutline();
            console.log(outline);
            newViewer.setDocument(doc);
            linkService.setDocument(doc);
        })();
    });

    return (
        <div className="App">
            <div
                id="viewerContainer"
                className="viewerContainer"
                ref={viewerContainer}
            >
                <div id="viewer" className="pdfViewer"></div>
            </div>
        </div>
    );
}

export default App;
