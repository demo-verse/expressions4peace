import { useState, React, useEffect } from "react";

import { faBold, faCode, faHeading, faItalic, faParagraph, faStrikethrough, faUndo, faRedo, faList, faListOl } from '@fortawesome/free-solid-svg-icons'
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import StarterKit from '@tiptap/starter-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Expression4Peace  from '../components/Expression4Peace'
import QuotesForPeace from '../pages/api/quotes/QuotesForPeace'

const ExpressionsEditor = () => {
  const [txt, setTxt] = useState("");
  const [messageEvent, setMessageEvent] = useState(null);
  const [textual, setTextual] = useState([]);

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image, StarterKit],
    content: ``,
  });


  const saveExpression = () => {
    const text = editor.getText();
    if (text.length > 0) {
      setTextual([...textual, text]);
      console.log(text)
      setMessageEvent("Expression saved!");
    }
  }

  const addImage = () => {
    // Open file browser for the user to select an image
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      console.log(file);
    }
    input.click();

  };

  useEffect(() => {
    if (messageEvent) {
      setTimeout(() => {
        setMessageEvent(null);
      }, 1881);
    }
  }, [messageEvent]);

  // Anytime textual change, save it to localStorage
  useEffect(() => {
    // Check if the array is empty
    if (textual.length > 0) {
      // Save the array to localStorage
      localStorage.setItem("textual", JSON.stringify(textual));
    }
  }, [textual]);


  useEffect(() => {
    const text = localStorage.getItem("expression");
    if (text) {
      setTxt(text);
    }

    // Get the textual from localStorage
    const textual = JSON.parse(localStorage.getItem("textual"));
    if (textual) {
      setTextual(textual);
    }
  }, []);

  return (
    <div className="expression__editor">
      {/* <QuotesForPeace/> */}
      <MenuBar className="richTextMenu" editor={editor} />
      <div className="expression__editor-content"><EditorContent editor={editor} /></div>
      <button className="btn primary upload" onClick={addImage}>Attach</button>
      <button className="btn primary save" onClick={saveExpression}>Express</button>
      
      <button className="btn primary mint" onClick={() => setMessageEvent('Your expression is queued for minting!')}>Mint</button>
      <button className="btn primary yield" onClick={() => setMessageEvent('Your expression is pooled for yielding!')}>Yield</button>

      {
        messageEvent && <Message message={messageEvent} />
      }
      {/* <ExpressionsList textual={textual} /> */}
    </div>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="menu">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faHeading} />

      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faList} />

      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faParagraph} />

      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faCode} />

      </button>
      {/* <button
        className={editor.isActive('paragraph') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faParagraph} />

      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faBold} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faItalic} />

      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'btn is-active' : 'btn'}
      >
        <FontAwesomeIcon icon={faStrikethrough} />

      </button>

      <button
        className={editor.isActive('paragraph') ? 'btn hider' : 'btn'}
      >
        <FontAwesomeIcon icon={faParagraph} />

      </button>
      


      <button onClick={() => editor.chain().focus().undo().run()} className="btn">
        <FontAwesomeIcon icon={faUndo} />

      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="btn">
        <FontAwesomeIcon icon={faRedo} />

      </button>
    </div>
  )
}

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="message__text">{message}</div>
    </div>
  )
}


const ExpressionsList = ({ textual }) => {
  return (
    <div className="textual__list">
      {
        textual.map((expression, index) => {
          return (
            <div className="expression__item" key={index}>
              <div className="expression__item-text">{expression}</div>
            </div>
          )
        })
      }
    </div>
  )
}

ExpressionsEditor.displayName = 'ExpressionsEditor';

export default ExpressionsEditor;