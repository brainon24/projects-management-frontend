import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './styles/textEditor.css';

const TextEditor = ({ value, setValue }: any) => {
    return (
        <form>
            <ReactQuill 
                placeholder='Escribe acá'
                value={ value } 
                onChange={ setValue }
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                className='text-editor-quill'
            />
        </form>
    )
}


TextEditor.modules = {
    toolbar: [
        [{ header: "1" }, {header: "2"}, {header: [3, 4, 5, 6]}, {font: []}],
        [{ size: [] }],
        [ "bold", "italic", "underline", "strike", "blockquote" ],
        [{ list: "ordered", }, { list: "bullet" }],
        // ["link", "image", "video"],
        ["link",],
        ["clean"],
        ["code-block"],
    ],
};

TextEditor.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	// "image",
	// "video",
	"code-block"
];

export default TextEditor;