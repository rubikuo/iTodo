import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./Todo.module.css";

const TodoForm = ({ submitTodo, addTodo, addContent }) => {
  return (
    <form onSubmit={submitTodo} className={styles.todoForm}>
      <input
        className={styles.todoInput}
        placeholder="Something to do..."
        onChange={addTodo}
        type="text"
        value={addContent}
      />
      <button className={styles.addBtn}>
        <FaPlusCircle className={styles.addBtnIcon} />
      </button>
    </form>
  );
};

export default TodoForm;
