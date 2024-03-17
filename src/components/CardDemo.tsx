import { useState, useEffect, useLayoutEffect, FC } from 'react';
import { Card, Typography, Button, Input, List } from 'antd';
// let c = (
//   <Card title={'Cipherlab RK25'} extra={1} lang={'en'} hoverable>
//     <Form layout={'horizontal'} name={'device'}>
//       <Form.Item name={'users'}>
//         <Input placeholder={'Title'} />
//       </Form.Item>

//       <Form.Item name={'mac'}>
//         <Input placeholder="MAC" />
//       </Form.Item>

//       <Form.Item name={'mac'}>
//         <Input placeholder="MAC" />
//       </Form.Item>
//     </Form>
//     <List size={'large'}>
//       <List.Item>1</List.Item>
//       <List.Item>2</List.Item>
//       <List.Item>3</List.Item>
//     </List>
//   </Card>
// );

export const CardComponent: FC<{ username }> = ({ username }) => {
  useLayoutEffect(() => {
    console.log(username);
    // getUsers();
  });
};
