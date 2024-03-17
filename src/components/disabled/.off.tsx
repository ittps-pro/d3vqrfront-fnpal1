
function Dashboard() {
  const { data: events } = useSWR('/api/events');
  const { data: projects } = useSWR('/api/projects');
  const { data: user } = useSWR('/api/user', { refreshInterval: 0 }); // override

  // ...
}

function User() {
  const { data } = useSWR('/api/user', fetcher)
}



function UserApp({ userId }) {
  const [show, setShow] = useState(false)
 
  // preload in effects
  useEffect(() => {
    preload('/api/user?id=' + userId, fetcher)
  }, [userId])
 
  return (
    <div>
      <button
        onClick={() => setShow(true)}
        {/* preload in event callbacks */}
        onHover={() => preload('/api/user?id=' + userId, fetcher)}
      >
        Show User
      </button>
      {show ? <UserApp userId={userId} /> : null}
    </div>
  )
}

function AppView() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      Data
    </SWRConfig>
  );
}

const MyPage: React.FC = () => {
  const { message, notification, modal } = App.useApp();

  // message.success('Good!');
  // notification.info({ message: 'Good' });
  // modal.warning({ title: 'Good' });
  // ....
  // other message, notification, modal static function
  return (
    <>
      <AppView />
    </>
  );
};

const MyApp: React.FC = () => (
  <App>
    <MyPage />

    Data
  </App>
);

let data = [
  {
    id: 1,
    name: 'NVPrint TK-5240',
    model: 'TK-5240',
    count: 4,
    devices: ['Kyocera M5526cdw'],
  },

  {
    id: 1,
    name: 'Sakura TK-5240',
    model: 'TK-5240',
    count: 12,
    color: 'black',
    devices: ['Kyocera M5526cdw'],
  },
];
