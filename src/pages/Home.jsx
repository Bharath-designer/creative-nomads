import React, { useState } from "react";

import "../styles/pages/Home.css";
import WeeklyOverview from "../components/Home/WeeklyOverview";

import plus_rounded from "../assets/plus-rounded.svg";
import arrow_right from "../assets/right.svg";

import attachment1 from "../assets/attachment1.png";
import attachment2 from "../assets/attachment2.png";

import checkbox from "../assets/checkbox.svg";
import checkbox_unchecked from "../assets/checkbox-unchecked.svg";
import tag from "../assets/tag.svg";
import edit from "../assets/edit.svg";
import delete_icon from "../assets/delete.svg";
import menu from "../assets/menu.svg";

const notes = [
  {
    title: "Follow Up with Mr. Ashton",
    descType: "para",
    desc: "Following up on our meeting with Mr. Ashton, I wanted to recap the key points discussed and outline the action items moving forward. During the meeting, we touched upon the project timeline, budget considerations, and specific deliverables. Mr. Ashton expressed ...",
    attachments: [
      {
        image: attachment1,
        name: "Screenshot Information.png",
      },
      {
        image: attachment2,
        name: "Important Information.pdf",
      },
    ],
    date: "21 May, 2024",
  },
  {
    title: "Setlist for hackathon",
    descType: "points",
    desc: [
      "Project Timeline",
      "Budget Considerations",
      "Specific Deliverables",
      "Additional Features for Software Solution",
      "Detailed Proposal for Review",
      "Prepare the PPT",
      "Review by Ravi",
      "GD",
      "The Grand Finale",
    ],
    date: "21 May, 2024",
  },
  {
    title: "Auroras and Sad Prose",
    descType: "list",
    desc: [
      [
        "Tears fall like rain on a lonely street",
        "Heart heavy with sorrow, no solace to meet",
        "Memories of joy now turned to dust",
        "In the shadows of sadness, I place my trust",
      ],
      [
        "Each note a reminder of what used to be",
        "A melody of pain, a symphony for me",
        "Lost in the darkness, searching for light",
        " A song of sadness, sung through the night",
      ],
      [
        "Echoes of laughter, now silent and still",
        "A heartache so deep, an endless chill",
        "Dreams shattered like glass on the floor",
        "In the silence of sadness, I long for more",
      ],
      [
        "But through the tears and the ache in my soul",
        "I find a glimmer of hope, a way to be whole",
        "For in the depths of despair, I discover the key",
        "To turn my song of sadness into a melody of glee",
      ],
      [
        "So I'll sing through the sorrow, I'll dance through the pain",
        "I'll rise from the ashes, I'll break every chain",
        "For sadness may linger, but joy will prevail",
        "In the music of life, I'll find my tale",
      ],
    ],
    date: "21 May, 2024",
  },
];

const dates = [
  {
    date: "19",
    day: "Sun",
  },
  {
    date: "20",
    day: "Mon",
  },
  {
    date: "21",
    day: "Tue",
    currentDate: true,
  },
  {
    date: "22",
    day: "Wed",
  },
  {
    date: "23",
    day: "Thu",
  },
  {
    date: "24",
    day: "Fri",
  },
  {
    date: "25",
    day: "Sat",
  },
];

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Donate Rs. 500 to the charity",
      isCompleted: true,
      todo: [
        {
          isCompleted: true,
          title: "Donate Rs. 500 to the charity",
        },
        {
          isCompleted: true,
          title: "Donate Rs. 500 to the charity",
        },
      ],
      totalCompleted: "2/2 Completed",
      tags: ["Donations", "Social"],
    },
    {
      title: "Do 500 pushups",
      isCompleted: false,
      todo: [
        {
          isCompleted: true,
          title: "Start with 100",
        },
        {
          isCompleted: false,
          title: "Complete 250",
        },
        {
          isCompleted: false,
          title: "Reach 400",
        },
      ],
      totalCompleted: "1/3 Completed",
      tags: ["Sport", "Selfcare"],
    },
    {
      title: "Buy new heaset",
      isCompleted: true,
      tags: ["Shopping", "Set-up"],
    },
    {
      title: "clean the room",
      isCompleted: false,
      tags: ["Selfcare"],
    },
  ]);

  const handleCheckItems = (taskIndex, itemIndex) => {
    const temp = [...tasks]
        
    temp[taskIndex].todo[itemIndex]['isCompleted'] = !temp[taskIndex].todo[itemIndex]['isCompleted']
    setTasks(temp)
    
  }

  const handleCheckTodo = (taskIndex) => {
    const temp = [...tasks]

    temp[taskIndex].isCompleted = !temp[taskIndex].isCompleted

    const resultToItems = temp[taskIndex].isCompleted

    temp[taskIndex]?.todo?.forEach(item=>{
        item.isCompleted = resultToItems
    })

    setTasks(temp)
    
  }

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <div className="top-greeting">
          <div className="greetings">Welcome Back!</div>
          <div className="user-home">Dalton's Home</div>
        </div>
        <WeeklyOverview />
        <div className="separator-line"></div>

        <div className="home-notes-container">
          <div className="notes-header">
            <div className="left">Notes</div>
            <div className="right">
              <button className="plus-notes">
                <img src={plus_rounded} alt="" />
              </button>
              <button className="right-arrow-notes">
                <img src={arrow_right} alt="" />
              </button>
            </div>
          </div>
          <div className="notes-content">
            {notes.map((note) => {
              return (
                <div key={note.title} className="note-wrapper">
                  <div className="title">{note.title}</div>
                  <div className="desc">
                    {note.descType === "para" && (
                      <div className="para">{note.desc}</div>
                    )}
                    {note.descType === "points" &&
                      note.desc.map((desc) => {
                        return (
                          <div key={desc} className="point">
                            - {desc}
                          </div>
                        );
                      })}
                    <div className="list">
                      {note.descType === "list" &&
                        note.desc.map((desc) => {
                          return (
                            <div key={desc} className="point">
                              {desc.map((p) => {
                                return <p key={p}>{p}</p>;
                              })}
                            </div>
                          );
                        })}
                    </div>
                    {note.attachments && (
                      <div className="attachment-wrapper">
                        <div className="header">Attachments</div>
                        <div className="attachments">
                          {note.attachments.map((att) => {
                            return (
                              <div key={att.name} className="attachment">
                                <div className="left">
                                  <img src={att.image} alt="" />
                                </div>
                                <div className="right">{att.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="note-footer">
                    <div className="left">{note.date}</div>
                    <div className="right">
                      <img src={arrow_right} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="home-right">
        <div className="calendar-container">
          <div className="header">
            <div className="left">Calendar</div>
            <div className="right">
              <img src={arrow_right} alt="" />
            </div>
          </div>
          <div className="date-container">
            {dates.map((date) => {
              return (
                <div
                key={date.date}
                  className={`date-item ${date.currentDate ? "active" : ""}`}
                >
                  <div className="top-area"></div>
                  <div className="content">
                    <p className="date">{date.date}</p>
                    <p className="day">{date.day}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="todo-container">
            <div className="card">
              <div className="card-title">To-Do</div>
              <div className="count">20</div>
            </div>
            <div className="card">
              <div className="card-title">In-Progress</div>
              <div className="count">15</div>
            </div>
            <div className="card">
              <div className="card-title">Completed</div>
              <div className="count">03</div>
            </div>
          </div>
        </div>

        <div className="line-separator"></div>
        <div className="task-day-container">
          <div className="header">
            <div className="left">Tasks for the day</div>
            <div className="right">
              <img src={plus_rounded} alt="" />
              <img src={arrow_right} alt="" />
            </div>
          </div>
          <div className="tasks-container">
            {tasks.map((task, taskIndex) => {
              return (
                <div key={task.title} className="task">
                  <div className="left">
                    <div className="todo-title">
                      <span>
                        <img
                        draggable="false"
                        onClick={()=>handleCheckTodo(taskIndex)}
                          src={task.isCompleted ? checkbox : checkbox_unchecked}
                          alt=""
                        />
                      </span>
                      <span
                        className={`todo-title-txt ${
                          task.isCompleted ? "completed" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    {task.todo && (
                      <div className="task-content">
                        {task.todo.map((todo, todoIndex) => {
                          return (
                            <div key={todo.title+todoIndex} className="todo-title">
                              <span>
                                <img
                        draggable="false"

                                onClick={()=>handleCheckItems(taskIndex, todoIndex)}
                                  src={
                                    todo.isCompleted
                                      ? checkbox
                                      : checkbox_unchecked
                                  }
                                />
                              </span>
                              <span
                                className={`todo-title-txt ${
                                  todo.isCompleted ? "completed" : ""
                                }`}
                              >
                                {todo.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="tags-container">
                      <div className="tag-left">
                        <img src={tag} alt="" />
                      </div>
                      <div className="tag-right">
                        {task.tags.map((tag, tagIndex) => {
                          return <div key={tag+tagIndex} className={`tag ${tag}`}>{tag}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    {
                        task.todo && (
                            <div className="task-status"> {`${task.todo.reduce((prev,itr)=> prev + (itr.isCompleted ? 1 : 0) ,0)}/${task.todo.length} Completed`}</div>
                        )
                    }
                    <div className="options">
                      <img draggable="false" src={edit} alt="" />
                      <img draggable="false" src={delete_icon} alt="" />
                      <img draggable="false" src={menu} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
