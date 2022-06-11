import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();

  const loadProjectHandler = () => router.push({
    pathname: '/clients/[id]/[clientProjectId]',
    query: { id: 'max', clientProjectId: 'project-a' }
  })

  return (
    <div>
      <h1>The Project of a Given Client.</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
