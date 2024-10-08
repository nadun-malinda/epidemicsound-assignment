import { Button } from "../../shared/ui/button/Button";
import { useParams, useNavigate } from "react-router-dom";

export function PlayListPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="text"
        startIcon="back"
        onClick={() => navigate("/playlists")}
      >
        Back to playlists
      </Button>
      <p>Single playlist page: {id}</p>
    </div>
  );
}
