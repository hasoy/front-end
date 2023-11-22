import { Card, Title, Typography } from "../components";
import { useStore } from "../hooks/useStore";

interface ITabProfile {}
function TabProfile({}: ITabProfile) {
  const { user } = useStore();
  return (
    <Card padding>
      <Title label="Profiel"></Title>
      <Typography label={user.current_user?.username}></Typography>
      <Typography label={user.current_user?.email}></Typography>
      <Typography label={user.current_user?.schoolOfThought}></Typography>
    </Card>
  );
}

export default TabProfile;
