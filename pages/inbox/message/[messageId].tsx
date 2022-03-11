import React, { ReactElement } from "react";
import { TextContainer, Text } from "react-md";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Route1(): ReactElement {
  const router = useRouter();
  const { inbox, messageId } = router.query;
  return (
    <TextContainer>
      <Text type="headline-4"><Link href={`/inbox/${inbox}`}>{inbox}</Link></Text>
      <p>Message id <code>{messageId}</code></p>
    </TextContainer>
  );
}
