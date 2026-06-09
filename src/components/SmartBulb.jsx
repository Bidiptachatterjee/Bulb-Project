// import { useEffect, useState } from "react";
// import "../styles/smartbulb.css";

// export default function SmartBulb() {

//   // INITIAL ROOM DATA
//   const initialRooms = [
//     {
//       id: 1,
//       name: "🏠 Bedroom",
//       isOn: false,
//       brightness: 50,
//       autoOffTime: "",
//       image: "/bedroom1.jpg",
//       color: "#ffff00",
//     },

//     {
//       id: 2,
//       name: "🍳 Kitchen",
//       isOn: false,
//       brightness: 50,
//       autoOffTime: "",
//       image: "/kitchen.jpg",
//       color: "#ffff00",
//     },

//     {
//       id: 3,
//       name: "🛋️ Hall",
//       isOn: false,
//       brightness: 50,
//       autoOffTime: "",
//       image: "/hall.jpg",
//       color: "#ffff00",
//     },

//     {
//       id: 4,
//       name: "📚 Study Room",
//       isOn: false,
//       brightness: 50,
//       autoOffTime: "",
//       image: "/studyroom.jpg",
//       color: "#ffff00",
//     },
//   ];

//   // ROOM STATE
//   const [rooms, setRooms] =
//     useState(initialRooms);

//   // LIVE TIME
//   const [currentTime, setCurrentTime] =
//     useState(
//       new Date().toLocaleTimeString()
//     );

//   // LIVE CLOCK
//   useEffect(() => {

//     const timer = setInterval(() => {

//       setCurrentTime(
//         new Date().toLocaleTimeString()
//       );

//     }, 1000);

//     return () => clearInterval(timer);

//   }, []);

//   // SAVE LOCAL STORAGE
//   useEffect(() => {

//     localStorage.setItem(
//       "rooms",
//       JSON.stringify(rooms)
//     );

//   }, [rooms]);

//   // AUTO OFF SYSTEM
//   useEffect(() => {

//     const interval = setInterval(() => {

//       const now =
//         new Date().toLocaleTimeString(
//           [],
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           }
//         );

//       const updatedRooms = rooms.map(
//         (room) => {

//           if (
//             room.autoOffTime === now &&
//             room.isOn
//           ) {

//             return {
//               ...room,
//               isOn: false,
//             };
//           }

//           return room;
//         }
//       );

//       setRooms(updatedRooms);

//     }, 1000);

//     return () =>
//       clearInterval(interval);

//   }, [rooms]);

//   // SOUND EFFECT
//   function playSound() {

//     const audio =
//       new Audio("/click.mp3");

//     audio.play();
//   }

//   // TOGGLE BULB
//   function toggleBulb(id) {

//     playSound();

//     const updatedRooms = rooms.map(
//       (room) =>

//         room.id === id
//           ? {
//               ...room,
//               isOn: !room.isOn,
//             }
//           : room
//     );

//     setRooms(updatedRooms);
//   }

//   // CHANGE BRIGHTNESS
//   function changeBrightness(
//     id,
//     value
//   ) {

//     const updatedRooms = rooms.map(
//       (room) =>

//         room.id === id
//           ? {
//               ...room,
//               brightness: value,
//             }
//           : room
//     );

//     setRooms(updatedRooms);
//   }

//   // CHANGE COLOR
//   function changeColor(id, value) {

//     const updatedRooms = rooms.map(
//       (room) =>

//         room.id === id
//           ? {
//               ...room,
//               color: value,
//             }
//           : room
//     );

//     setRooms(updatedRooms);
//   }

//   // TURN ON ALL
//   function turnOnAll() {

//     playSound();

//     const updatedRooms = rooms.map(
//       (room) => ({
//         ...room,
//         isOn: true,
//       })
//     );

//     setRooms(updatedRooms);
//   }

//   // TURN OFF ALL
//   function turnOffAll() {

//     playSound();

//     const updatedRooms = rooms.map(
//       (room) => ({
//         ...room,
//         isOn: false,
//       })
//     );

//     setRooms(updatedRooms);
//   }

//   // SET AUTO OFF TIME
//   function setAutoOffTime(
//     id,
//     time
//   ) {

//     const updatedRooms = rooms.map(
//       (room) =>

//         room.id === id
//           ? {
//               ...room,
//               autoOffTime: time,
//             }
//           : room
//     );

//     setRooms(updatedRooms);
//   }

//   return (

//     <div className="main-container">

//       {/* TITLE */}
//       <h1>
//         💡 Smart Home Lighting Dashboard
//       </h1>

//       {/* LIVE CLOCK */}
//       <h3 className="time">
//         Current Time:
//         {" "}
//         {currentTime}
//       </h3>

//       {/* MASTER BUTTONS */}
//       <div className="master-buttons">

//         <button onClick={turnOnAll}>
//           Turn ON All
//         </button>

//         <button onClick={turnOffAll}>
//           Turn OFF All
//         </button>

//       </div>

//       {/* ROOM CARDS */}
//       <div className="room-container">

//         {rooms.map((room) => (

//           <div
//             className="card"
//             key={room.id}

//             style={{

//               backgroundImage:
//                 `linear-gradient(
//                   rgba(0,0,0,0.5),
//                   rgba(0,0,0,0.5)
//                 ),
//                 url(${room.image})`,

//               backgroundSize: "cover",
//               backgroundPosition: "center",

//             }}
//           >

//             {/* ROOM NAME */}
//             <h2>{room.name}</h2>

//             {/* BULB */}
//             <div
//               className={
//                 room.isOn
//                   ? "bulb active"
//                   : "bulb"
//               }

//               style={{

//                 opacity: room.isOn
//                   ? room.brightness / 100
//                   : 0.3,

//                 background: room.color,

//                 boxShadow: room.isOn
//                   ? `0 0 40px ${room.color}`
//                   : "none",

//               }}
//             ></div>

//             {/* BUTTON */}
//             <button
//               onClick={() =>
//                 toggleBulb(room.id)
//               }
//             >

//               {room.isOn
//                 ? "Turn OFF"
//                 : "Turn ON"}

//             </button>

//             {/* BRIGHTNESS */}
//             <input
//               type="range"
//               min="10"
//               max="100"
//               value={room.brightness}
//               onChange={(e) =>
//                 changeBrightness(
//                   room.id,
//                   e.target.value
//                 )
//               }
//             />

//             <p>
//               Brightness:
//               {" "}
//               {room.brightness}%
//             </p>

//             {/* COLOR PICKER */}
//             <input
//               type="color"
//               value={room.color}
//               onChange={(e) =>
//                 changeColor(
//                   room.id,
//                   e.target.value
//                 )
//               }
//             />

//             {/* ENERGY */}
//             <p>

//               Energy Usage:
//               {" "}

//               {room.isOn
//                 ? (
//                     room.brightness * 0.12
//                   ).toFixed(1)
//                 : 0}

//               {" "}
//               W

//             </p>

//             {/* STATUS */}
//             <p>

//               Status:
//               {" "}

//               {room.isOn
//                 ? "🟢 Active"
//                 : "🔴 Inactive"}

//             </p>

//             {/* TIMER */}
//             <div className="timer-section">

//               <p>
//                 Auto OFF Time
//               </p>

//               <input
//                 type="time"
//                 value={
//                   room.autoOffTime
//                 }
//                 onChange={(e) =>
//                   setAutoOffTime(
//                     room.id,
//                     e.target.value
//                   )
//                 }
//               />

//             </div>

//             {/* SCHEDULE */}
//             <p>

//               Scheduled OFF:
//               {" "}

//               {room.autoOffTime
//                 ? room.autoOffTime
//                 : "Not Set"}

//             </p>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import "../styles/smartbulb.css";

export default function SmartBulb() {
  // INITIAL ROOM DATA
  const initialRooms = [
    {
      id: 1,
      name: "🏠 Bedroom",
      isOn: false,
      brightness: 50,
      autoOffTime: "",
      image: "/bedroom1.jpg",
      color: "#ffff00",
    },
    {
      id: 2,
      name: "🍳 Kitchen",
      isOn: false,
      brightness: 50,
      autoOffTime: "",
      image: "/kitchen.jpg",
      color: "#ffff00",
    },
    {
      id: 3,
      name: "🛋️ Hall",
      isOn: false,
      brightness: 50,
      autoOffTime: "",
      image: "/hall.jpg",
      color: "#ffff00",
    },
    {
      id: 4,
      name: "📚 Study Room",
      isOn: false,
      brightness: 50,
      autoOffTime: "",
      image: "/studyroom.jpg",
      color: "#ffff00",
    },
  ];

  // LOAD FROM LOCAL STORAGE
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("rooms");
    return savedRooms
      ? JSON.parse(savedRooms)
      : initialRooms;
  });

  // ADD ROOM STATES
  const [newRoomName, setNewRoomName] =
    useState("");

  const [newRoomImage, setNewRoomImage] =
    useState("");

  // LIVE CLOCK
  const [currentTime, setCurrentTime] =
    useState(
      new Date().toLocaleTimeString()
    );

  // CLOCK
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString()
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "rooms",
      JSON.stringify(rooms)
    );
  }, [rooms]);

  // AUTO OFF SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      const now =
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.autoOffTime === now &&
          room.isOn
            ? {
                ...room,
                isOn: false,
              }
            : room
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SOUND
  function playSound() {
    const audio =
      new Audio("/click.mp3");

    audio.play();
  }

  // ADD ROOM
  function addRoom() {
    if (!newRoomName.trim()) return;

    const newRoom = {
      id: Date.now(),
      name: newRoomName,
      isOn: false,
      brightness: 50,
      autoOffTime: "",
      image:
        newRoomImage ||
        "/bedroom1.jpg",
      color: "#ffff00",
    };

    setRooms([...rooms, newRoom]);

    setNewRoomName("");
    setNewRoomImage("");
  }

  // DELETE ROOM
  function deleteRoom(id) {
    const updatedRooms = rooms.filter(
      (room) => room.id !== id
    );

    setRooms(updatedRooms);
  }

  // TOGGLE BULB
  function toggleBulb(id) {
    playSound();

    const updatedRooms = rooms.map(
      (room) =>
        room.id === id
          ? {
              ...room,
              isOn: !room.isOn,
            }
          : room
    );

    setRooms(updatedRooms);
  }

  // BRIGHTNESS
  function changeBrightness(
    id,
    value
  ) {
    const updatedRooms = rooms.map(
      (room) =>
        room.id === id
          ? {
              ...room,
              brightness: value,
            }
          : room
    );

    setRooms(updatedRooms);
  }

  // COLOR
  function changeColor(id, value) {
    const updatedRooms = rooms.map(
      (room) =>
        room.id === id
          ? {
              ...room,
              color: value,
            }
          : room
    );

    setRooms(updatedRooms);
  }

  // TURN ON ALL
  function turnOnAll() {
    playSound();

    setRooms(
      rooms.map((room) => ({
        ...room,
        isOn: true,
      }))
    );
  }

  // TURN OFF ALL
  function turnOffAll() {
    playSound();

    setRooms(
      rooms.map((room) => ({
        ...room,
        isOn: false,
      }))
    );
  }

  // AUTO OFF TIME
  function setAutoOffTime(
    id,
    time
  ) {
    const updatedRooms = rooms.map(
      (room) =>
        room.id === id
          ? {
              ...room,
              autoOffTime: time,
            }
          : room
    );

    setRooms(updatedRooms);
  }

  return (
    <div className="main-container">
      {/* TITLE */}
      <h1>
        💡 Smart Home Lighting Dashboard
      </h1>

      {/* LIVE CLOCK */}
      <h3 className="time">
        Current Time: {currentTime}
      </h3>

      {/* ADD ROOM SECTION */}
      <div className="add-room-section">
        <input
          type="text"
          placeholder="Enter Room Name"
          value={newRoomName}
          onChange={(e) =>
            setNewRoomName(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={newRoomImage}
          onChange={(e) =>
            setNewRoomImage(
              e.target.value
            )
          }
        />

        <button onClick={addRoom}>
          ➕ Add Room
        </button>
      </div>

      {/* MASTER BUTTONS */}
      <div className="master-buttons">
        <button onClick={turnOnAll}>
          Turn ON All
        </button>

        <button onClick={turnOffAll}>
          Turn OFF All
        </button>
      </div>

      {/* ROOMS */}
      <div className="room-container">
        {rooms.map((room) => (
          <div
            className="card"
            key={room.id}
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(0,0,0,0.5),
                  rgba(0,0,0,0.5)
                ),
                url(${room.image})
              `,
              backgroundSize: "cover",
              backgroundPosition:
                "center",
            }}
          >
            {/* ROOM NAME */}
            <h2>{room.name}</h2>

            {/* BULB */}
            <div
              className={
                room.isOn
                  ? "bulb active"
                  : "bulb"
              }
              style={{
                opacity: room.isOn
                  ? room.brightness /
                    100
                  : 0.3,

                background:
                  room.color,

                boxShadow: room.isOn
                  ? `0 0 40px ${room.color}`
                  : "none",
              }}
            ></div>

            {/* ON OFF BUTTON */}
            <button
              onClick={() =>
                toggleBulb(room.id)
              }
            >
              {room.isOn
                ? "Turn OFF"
                : "Turn ON"}
            </button>

            {/* DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={() =>
                deleteRoom(room.id)
              }
            >
              🗑 Delete Room
            </button>

            {/* BRIGHTNESS */}
            <input
              type="range"
              min="10"
              max="100"
              value={
                room.brightness
              }
              onChange={(e) =>
                changeBrightness(
                  room.id,
                  e.target.value
                )
              }
            />

            <p>
              Brightness:
              {" "}
              {room.brightness}%
            </p>

            {/* COLOR PICKER */}
            <input
              type="color"
              value={room.color}
              onChange={(e) =>
                changeColor(
                  room.id,
                  e.target.value
                )
              }
            />

            {/* ENERGY */}
            <p>
              Energy Usage:
              {" "}
              {room.isOn
                ? (
                    room.brightness *
                    0.12
                  ).toFixed(1)
                : 0}
              {" "}
              W
            </p>

            {/* STATUS */}
            <p>
              Status:
              {" "}
              {room.isOn
                ? "🟢 Active"
                : "🔴 Inactive"}
            </p>

            {/* TIMER */}
            <div className="timer-section">
              <p>
                Auto OFF Time
              </p>

              <input
                type="time"
                value={
                  room.autoOffTime
                }
                onChange={(e) =>
                  setAutoOffTime(
                    room.id,
                    e.target.value
                  )
                }
              />
            </div>

            {/* SCHEDULE */}
            <p>
              Scheduled OFF:
              {" "}
              {room.autoOffTime
                ? room.autoOffTime
                : "Not Set"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
