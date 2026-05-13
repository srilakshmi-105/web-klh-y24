import React, { useEffect, useState } from 'react'
import { Button, Stack, TextInput } from '@mantine/core';
import Service from '../../utils/http';


const URLShortener = () => {
   const service = new Service();
   const [data, setData] = useState({});
   const [shortUrl, setShortUrl] = useState("");
   const handleSubmit = async () => {
       try {
           // Fill the logic
           console.log(data);
           const response= await service.post("s",data);
           console.log(response);
           setShortUrl(`https://localhost:5173/api/s/${response.shortCode}`);
       } catch (error) {
           console.error("POST API call failed!", error.message);
       }
   }

   useEffect(() => {
       console.log(`Short URL is ${shortUrl}`);
   }, [shortUrl])
   return (
       <>
            {shortUrl && shortUrl.length>0 ? (<p>{shortUrl}</p>) :
           (
               <Stack>
                   <TextInput
                       size="md"
                       label="Original URL"
                       withAsterisk
                       onChange={ (event)=>setData({...data,originalUrl: event.target.value})}
                       placeholder="Enter original URL"
                   />
                    <TextInput
                       size="md"
                       label="Customize your link ( Optional )"
                       withAsterisk
                       onChange={ (event)=>setData({...data,originalUrl: event.target.value})}
                       placeholder="Customize your link"
                   />
                   <TextInput
                       size="md"
                       label="Title ( Optional )"
                       withAsterisk
                       onChange={ (event)=>setData({...data,originalUrl: event.target.value})}
                       placeholder="Title of URL"
                   />
                   <Button onClick={handleSubmit}>
                            Shorten URL
                    </Button>
               </Stack>
           )
        }
       </>
   )
}

export default URLShortener