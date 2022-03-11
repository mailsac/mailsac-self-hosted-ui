import React, { ReactElement, useState } from "react";
import {
  Button,
  Fieldset,
  Form,
  Text,
  TextContainer,
  TextField,
} from "react-md";
import { useRouter } from "next/router";

export default function ViewMessage(): ReactElement {
  const [inbox, setInbox] = useState("");
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/inbox/${inbox}`);
  };
  return (
    <TextContainer>
      <Text type="headline-4">Temporary Email System</Text>
      <Form onSubmit={onSubmit}>
        <Fieldset legend="Enter email address">
          <TextField
            id="email-inbox"
            type="email"
            autoFocus={true}
            value={inbox}
            onChange={(e) => setInbox(e.target.value)}
          />
          <br />
          <Button theme="primary" themeType="contained" onClick={onSubmit}>
            View mail
          </Button>
        </Fieldset>
      </Form>
    </TextContainer>
  );
}
