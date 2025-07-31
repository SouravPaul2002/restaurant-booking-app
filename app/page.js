import { Button } from "@/components/ui/button";
import Search from "./_components/Search";
import Landing from "./_components/Landing";
export default function Home() {
  return (
  <div>
    {/* landing section */}
    <Landing/>

    {/* search for the types of restaurant  */}
    <Search/>
  </div>
  );
}
