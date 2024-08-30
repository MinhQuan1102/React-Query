import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css'
import Home from './components/Home.tsx'
import RQSuperHeroes from './components/RQSuperHeroes.tsx'
import SuperHeroes from './components/SuperHeroes.tsx'
import RQSuperHero from './components/RQSuperHero.tsx';
import ParallelQueries from './components/ParallelQueries.tsx';
import DynamicParallel from './components/DynamicParallel.tsx';
import DependentQueries from './components/DependentQueries.tsx';
import PaginatedQueries from './components/PaginatedQueries.tsx';
import InfiniteQueries from './components/InfiniteQueries.tsx';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/rq-infinite' element={ <InfiniteQueries />}></Route>
            <Route path='/rq-paginated' element={ <PaginatedQueries />}></Route>
            <Route path='/rq-dependent' element={ <DependentQueries email='vishwas@example.com'/>}></Route>
            <Route path='/rq-dynamic-parallel' element={ <DynamicParallel heroIds={[1, 3]}/> }></Route>
            <Route path='/rq-super-heroes/:heroId' element={ <RQSuperHero />}>
            </Route>
            <Route path='/rq-parallel' element={ <ParallelQueries />}>
            </Route>
            <Route path='/super-heroes' element={ <SuperHeroes /> }>
            </Route>
            <Route path='/rq-super-heroes' element={ <RQSuperHeroes /> }>
            </Route>
            <Route path='/' element={ <Home /> }>
            </Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={ false } position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
