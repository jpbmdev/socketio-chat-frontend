import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const [mensaje, setMensaje] = useState("");

  const onChance = ({ target }) => {
    setMensaje(target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (mensaje.length === 0) return;
    setMensaje("");
    //TODO: Emitir un evento de sockets para enviar el mensaje
    socket.emit("mensaje-personal", {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={onChance}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
