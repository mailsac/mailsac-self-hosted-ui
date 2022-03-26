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

const defaultEmail = process.env.NEXT_PUBLIC_MAILSAC_CUSTOM_DOMAIN ? `@${process.env.NEXT_PUBLIC_MAILSAC_CUSTOM_DOMAIN}` : "";
export default function SelectAddress(): ReactElement {
  const [inbox, setInbox] = useState(defaultEmail);
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/inbox/${inbox}`);
  };
  return (
    <TextContainer>
      <Text type="headline-4">Enter Email Address</Text>
      <Form onSubmit={onSubmit}>
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
      </Form>
    </TextContainer>
  );
}
