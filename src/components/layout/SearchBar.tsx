import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import '../../styles/layout/searchBar.scss'

interface IItem {
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  snippet: string;
  pagemap: {
    cse_thumbnail?: IItemThumbnail[];
  };
  title: string;
}

interface IItemThumbnail {
  height: string;
  src: string;
  width: string;
}

function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<IItem[] | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (searchText.length <= 3) {
      setError('Must type more than 3 chars');
      setItems(null); // Ensure items are cleared if there's an error.
      return;
    }

    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: searchText,
          key: 'AIzaSyBFvRB7YzihT09YoJpzFbPRzpvD2PVYRjI',
          cx: '97b12f580df94404e'
        },
        withCredentials: false
      });


      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('No search results');
      }
      setItems(response.data.items);
      setError(''); // Clear error on successful fetch.
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="seachbar-container">
      {/* <h2>Search API</h2> */}
      <section id="searchbar">
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search"
            value={searchText} // Controlled component
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchText(e.target.value) }}
          />
          <button type="submit" className='search-button'>Search</button>
        </form>
      </section>

      <section id="results">
        <h2>Results</h2>

        {error && <p>{error}</p>}

        {items && items.map((item) => (
          <div key={item.link}>
            <section>
              {item.pagemap.cse_thumbnail && (
                <img src={item.pagemap.cse_thumbnail[0].src} alt={item.title} />
              )}

              {!item.pagemap.cse_thumbnail && (
                <img src='https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg' alt="No Thumbnail" />
              )}
            </section>

            <section>
              <h3>{item.title}</h3>
              <p>{item.snippet}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">To Product -&gt;</a>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default SearchBar