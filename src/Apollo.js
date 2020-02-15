import { defaults, resolvers, typeDefs } from "./clientState";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

// apollo-boost 쓰면 이걸 자동으로 해줌.
// 자동으로 될 부분까지 전부 수동으로 해볼거야
// internet api 온라인 부분은 빼고말이야
const cache = new InMemoryCache();

const stateLink = withClientState({
  // default state가 필요해. notes는 타입 정의나 resolvers같은걸 필요로 해. 이부분에 앱에 필요한 모든 로직을 넣어야해
  // 그러니까 모든 로직을 웹에있는 clientState에 적어줘야 하는거야.
  // reseolver 같은 경우는 오프라인으로 해주고, 타입선언, default state도. 여기서 해줘야 해.
  // 왜냐면 여기는 client state니까
  // clientState는 cache가 필요해. 내가 clientState를 어디에 저장할건지 지정을 해줘야 해
  // 타입 정의도 필요해
  // 디폴트, 리졸버가 필요햐ㅐ. 이걸 전부 import
  cache,
  typeDefs,
  defaults,
  resolvers
}); // 아폴로에서 거의 모든 명령어들은 전부 링크가 돼. http link도 있고 error link, state link도 있어

// 여기선 http link & error link 만들거야. subscription을 위한 web socket을 넣거나.... 아니면 전부를 넣거나!
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink])
});

export default client;
