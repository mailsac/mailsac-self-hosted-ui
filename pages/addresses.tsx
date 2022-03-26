import React, { ReactElement, useState } from "react";
import { List, ListItem, Text, TextContainer } from "react-md";
import { useRouter } from "next/router";
import superagent from "superagent";

export default function ListMyAddresses(props: {
  error: null | string;
  addresses: any[];
}): ReactElement {
  const router = useRouter();
  const { error, addresses } = props;
  return (
    <TextContainer>
      <Text type="headline-4">Saved Addresses</Text>
      {error && <pre>{error}</pre>}
      {!addresses?.length && (
        <p>
          <em>No saved addresses</em>
        </p>
      )}
      <List>
        {addresses.map((a) => (
          <ListItem key={a._id} onClick={() => router.push(`/inbox/${a._id}`)}>
            {a._id}
          </ListItem>
        ))}
      </List>
    </TextContainer>
  );
}

export async function getServerSideProps(context) {
  let error: null | string = null;
  let addresses: any[] = [];
  try {
    addresses = await superagent
      .get(`https://mailsac.com/api/addresses`)
      .set("mailsac-key", process.env.MAILSAC_KEY)
      .then((res) => res.body);
  } catch (err) {
    error = err.toString();
  }
  return {
    props: {
      addresses: addresses.sort((a, b) => (a._id.toLowerCase() > b._id.toLowerCase() ? 1 : -1)),
      error,
    }, // will be passed to the page component as props
  };
}
