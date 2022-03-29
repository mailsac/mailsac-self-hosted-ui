import React, { ReactElement } from "react";
import {
  TextContainer,
  Text,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "react-md";
import { useRouter } from "next/router";
import superagent from "superagent";

const MessageRow = (props: { m: any; inbox: string }) => {
  const { m, inbox } = props;
  const router = useRouter();
  const displayDate = new Date(m.received).toLocaleTimeString();
  return (
    <TableRow
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`/inbox/${inbox}/message/${m._id}`)}
    >
      <TableCell>{m.from?.[0]?.address}</TableCell>
      <TableCell>{m.subject}</TableCell>
      <TableCell hAlign="right">{displayDate}</TableCell>
    </TableRow>
  );
};

const MessageTable = (props: { messages: any[]; inbox: string }) => {
  return (
    <Table fullWidth={true}>
      <TableBody>
        {props.messages.map((m) => (
          <MessageRow key={m.id} m={m} inbox={props.inbox} />
        ))}
      </TableBody>
    </Table>
  );
};

export default function InboxIndex(props: {
  error: null | string;
  messages: any[];
}): ReactElement {
  const router = useRouter();
  const { inbox } = router.query;
  const { error, messages } = props;

  return (
    <>
      <TextContainer>
        <Text type="headline-4">{inbox}</Text>
        {error && <pre>{error}</pre>}
        {!messages?.length && <Text type="headline-6">No messages</Text>}
      </TextContainer>
      {messages?.length ? (
        <MessageTable messages={messages} inbox={inbox as string} />
      ) : null}
    </>
  );
}

export async function getServerSideProps(context) {
  let error: null | string = null;
  let messages: any[] = [];
  try {
    messages = await superagent
      .get(`https://mailsac.com/api/addresses/${context.query.inbox}/messages`)
      .set("mailsac-key", process.env.MAILSAC_KEY)
      .then((res) => res.body);
  } catch (err) {
    error = err.toString();
  }
  return {
    props: {
      messages,
      error,
    }, // will be passed to the page component as props
  };
}
