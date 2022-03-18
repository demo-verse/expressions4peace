import { useState, React, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import StarterKit from '@tiptap/starter-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faCode, faHeading, faItalic, faParagraph, faStrikethrough, faUndo, faRedo, faList, faListOl } from '@fortawesome/free-solid-svg-icons'




const ExpressionsEditor = () => {
  const [txt, setTxt] = useState("");
  const [messageEvent, setMessageEvent] = useState(null);
  const [expressions, setExpressions] = useState([]);

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image, StarterKit],
    content: ``,
  });

  const saveExpression = () => {
    const text = editor.getText();
    if (text.length > 0) {
      setExpressions([...expressions, text]);
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
      }, 800);
    }
  }, [messageEvent]);

  // Anytime expressions change, save it to localStorage
  useEffect(() => {
    // Check if the array is empty
    if (expressions.length > 0) {
      // Save the array to localStorage
      localStorage.setItem("expressions", JSON.stringify(expressions));
    }
  }, [expressions]);


  useEffect(() => {
    const text = localStorage.getItem("expression");
    if (text) {
      setTxt(text);
    }

    // Get the expressions from localStorage
    const expressions = JSON.parse(localStorage.getItem("expressions"));
    if (expressions) {
      setExpressions(expressions);
    }
  }, []);

  return (
    <div className="expression__editor">
      <MenuBar className="richTextMenu" editor={editor} />
      <div className="expression__editor-content"><EditorContent editor={editor} /></div>
      <button className="btn primary upload" onClick={addImage}>Attach</button>
      <button className="btn primary save" onClick={saveExpression}>Send</button>
      <button className="btn primary mint" onClick={() => setMessageEvent('You minted your text!')}>Mint</button>
      {
        messageEvent && <Message message={messageEvent} />
      }
      <ExpressionsList expressions={expressions} />
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
      <button
        className={editor.isActive('paragraph') ? 'btn hider' : 'btn'}
      >
        <FontAwesomeIcon icon={faParagraph} />

      </button>
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


const ExpressionsList = ({ expressions }) => {
  return (
    <div className="expressions__list">
      {
        expressions.map((expression, index) => {
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