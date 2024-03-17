import { Button, ConfigProvider, Typography } from 'antd';

interface StartProps {
  title: string;
  subtitle?: string;

}

const HeaderComponent = () => {

  return <header>header cmp</header>
}

const StartView: React.FC = (props:<StartProps>) => {
  // const { message, notification, modal } = App.useApp();
  // message.success('Good!');
  // notification.info({ message: 'Good' });
  // modal.warning({ title: 'Good' });
  // ....
  // other message, notification, modal static function
  return (
    <div>

      <HeaderComponent>
        </HeaderComponent>
      <Typography>
        <Typography.Title>Page title</Typography.Title>

        <Typography.Paragraph>Page desc</Typography.Paragraph>
      </Typography>
      <ConfigProvider>start view</ConfigProvider>
    </div>
  );
};

const StartComponent: React.FC = (config) => <StartView {...config} />;
