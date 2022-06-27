import React, { FC } from "react";
import Head from "next/head";
import styled from "styled-components";
import { BinderMenu } from "../components/BinderMenu"

const Box = styled.div`
  display: flex;
  justify-content: center; 
`

const customStyle = {
    height: "150px",
    background: "#f5f2f7",
    border: "1px solid #e6e0ea",
    marginTop: "200px",
    borderRadius: "4px",
}

export const Main: FC<HTMLDivElement> = () => {
 
function updateVCSInfo(e: React.FormEvent<HTMLFormElement>, provider: string | undefined, org: string | undefined, repo: string | undefined, gitRef: string | undefined){
    const url = `${window.location.href}p/${provider}/${org}/${repo}/${gitRef}`
    window.open(url, "_self");
    e.preventDefault()
}

return (
  <>
          <Head>
             <title>nteract play: Run interactive code</title> 
             <meta charSet="utf-8" />
             <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>

  <Box>
              <BinderMenu
                        provider="gh"
                        org="nteract"
                        repo="examples"
                        gitRef="master"
                        updateVCSInfo={updateVCSInfo}
                        style={customStyle}
              />

  </Box>
  </>
      );
}

/*
 TODO: We need to add nteract logo and few instructions here about the application, this is the landing page.
 */

export default Main
