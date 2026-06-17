import { MainLayout } from "./main-layout";
import Providers from "./providers/main-provider";

function App() {
  return (
    <>
      <Providers>
        <MainLayout />
      </Providers>
    </>
  );
}

export default App;
