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

export default function Index(props: {
  error: null | string;
  messages: any[];
}): ReactElement {
  const router = useRouter();
  const { inbox } = router.query;
  const { error, messages } = props;

  return (
    <TextContainer>
      <Text type="headline-4">{inbox}</Text>
      {error && <pre>{error}</pre>}
      {!messages?.length && <Text type="headline-6">No messages</Text>}
      {messages?.length ? (
        <Table>
          <TableBody>
            {messages.map((m) => (
              <TableRow
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/inbox/${inbox}/message/${m._id}`)}
                key={m._id}
              >
                <TableCell>{m.from?.[0]?.address}</TableCell>
                <TableCell>{m.subject}</TableCell>
                <TableCell>{m.received}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </TextContainer>
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
