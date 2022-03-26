import React, { ReactElement } from "react";
import superagent from "superagent";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  TextContainer,
  Text,
} from "react-md";
import { Link as ReactMDLink } from "@react-md/link";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Route1(props: {
  error: null | string;
  messageHtml: string;
}): ReactElement {
  const router = useRouter();
  const { inbox, messageId } = router.query;
  return (
    <TextContainer>
      <Text type="headline-4">
        <ReactMDLink
          theme={"primary"}
          component={Link}
          href={`/inbox/${inbox}`}
        >
          {inbox}
        </ReactMDLink>
      </Text>
      {props.error ? (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{props.error}</p>
          </CardContent>
        </Card>
      ) : (
        <iframe
          srcDoc={props.messageHtml}
          style={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            minHeight: "600px",
          }}
        />
      )}
      <p>
        id <code>{messageId}</code>
      </p>
    </TextContainer>
  );
}

export async function getServerSideProps(context) {
  let error: null | string = null;
  let messageHtml: string;
  const endpoint = `https://mailsac.com/api/dirty/${context.query.inbox}/${context.query.messageId}`;
  console.log(endpoint);
  try {
    messageHtml = await superagent
      .get(endpoint)
      .set("mailsac-key", process.env.MAILSAC_KEY)
      .then((res) => res.text);
  } catch (err) {
    error = err.toString();
  }
  return {
    props: {
      messageHtml,
      error,
    }, // will be passed to the page component as props
  };
}
