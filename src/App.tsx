import "./App.css";
import Column, { CardStatus } from "./components/column/column.component";
import Board from "./components/board/board.component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

const CARD_STATUSES: CardStatus[] = ["todo", "doing", "done"];

const assertNever = (x: never): never => {
  throw new Error();
};

const statusToTitle = (status: CardStatus) => {
  switch (status) {
    case "todo":
      return "Todo";
    case "doing":
      return "Doing";
    case "done":
      return "Done";
    default:
      return assertNever(status);
  }
};

function App() {
  return (
    <div>
      <div>
        <AmplifySignOut />
      </div>
      <div className="flex w-screen">
        <DndProvider backend={HTML5Backend}>
          <Board>
            {CARD_STATUSES.map((cardStatus) => (
              <Column
                key={cardStatus}
                columnStatus={cardStatus}
                title={statusToTitle(cardStatus)}
              />
            ))}
          </Board>
        </DndProvider>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
