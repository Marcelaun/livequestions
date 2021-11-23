import { ReactNode } from "react";
import cxadm from "classnames";

import "../styles/questions.scss";

type AdminQuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function AdminQuestion({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: AdminQuestionProps) {
  return (
    <div
      className={cxadm(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
