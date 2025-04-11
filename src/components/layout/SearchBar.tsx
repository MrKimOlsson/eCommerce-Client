import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import '../../styles/layout/searchBar.scss';
import { AiOutlineSearch } from "react-icons/ai";

interface IItemThumbnail {
  height: string;
  src: string;
  width: string;
}

interface ISearchItem {
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
    cse_image?: IItemThumbnail[];
    metatags?: Array<{ [key: string]: string }>;
  };
  title: string;
  description?: string;
}

function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<ISearchItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const itemsPerPage = 10;

  const productMapping: { [key: string]: number } = {
      "https://xreart.com/products/xreart-game-boy-pocket": 3,
      "https://xreart.com/products/xreart-iwatch1": 5,
      "https://xreart.com/products/xreart-nintendo-game-boy-original-1989-super-mario-land-frame": 7,
      "https://xreart.com/products/xreart-iphone1-frame": 8,
      "https://xreart.com/products/xreart-game-boy-color": 9,
      "https://xreart.com/products/iphone4": 10,
      "https://xreart.com/products/xreart-iphone-1st-generation-frame-limited-edition": 11,
      "https://xreart.com/products/xreart-nintendo-game-boy": 12,
      "https://xreart.com/products/iphone3gs": 13,
      "https://xreart.com/products/iphone5s": 14,
      "https://xreart.com/products/iphone4s": 18,
      "https://xreart.com/products/iphone5": 19,
      "https://xreart.com/products/iphone6": 20,
      "https://xreart.com/products/xreart-iphone-3g": 21,
      "https://xreart.com/products/xreart-nintendo-game-boy-advance": 22,
      "https://xreart.com/products/iphone-x": 23,
      "https://xreart.com/products/xreart-iphone-6s": 24,
      "https://xreart.com/products/iphone-7": 25,
      "https://xreart.com/products/iphone-8": 26,
      "https://xreart.com/products/xreart-samsung-galaxy-s": 27,
      "https://xreart.com/products/xreart-ipod-touch": 28,
      "https://xreart.com/products/xreart-microsoft-xbox-360": 29,
      "https://xreart.com/products/xreart-game-boy-advance-sp": 30,
      "https://xreart.com/products/xreart-psp-1000": 31,
      "https://xreart.com/products/xreart-nokia-e71-teardown-shadow-box": 32,
      "https://xreart.com/products/xreart-psp-2000": 33,
      "https://xreart.com/products/nintendo-switch-joy-con": 34,
  };

 // Reference for results container
 const resultsRef = useRef<HTMLDivElement | null>(null);

 // Click outside handler (close the search results when clicking outside of it)
 const handleClickOutside = (event: MouseEvent) => {
   if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
     setShowResults(false); // Hide results if clicked outside
   }
 };

 useEffect(() => {
   // Add event listener for clicks
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     // Cleanup the event listener
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);
  

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setItems([]);
    setError('');
    setLoading(true);
    setShowResults(false);

    if (searchText.length <= 3) {
      setError('Must type more than 3 chars');
      setLoading(false);
      return;
    }

    fetchResults(); // Call fetchResults only on search button click (to avoid reaching fetch limit)
  };

  const fetchResults = async () => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;

    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: searchText,
          key: 'AIzaSyBFvRB7YzihT09YoJpzFbPRzpvD2PVYRjI',
          cx: '97b12f580df94404e',
          num: itemsPerPage,
          start: startIndex,
        },
        withCredentials: false,
      });
  
        if (response.data.items) {
          setItems(response.data.items);
          setTotalResults(parseInt(response.data.searchInformation.totalResults, 10));
          setShowResults(true);
        } else {
          setError('No items found. Please try searching with different keywords.');
          setItems([]);
        }
      } catch (error) {
        setError('An error occurred while fetching results.');
      } finally {
        setLoading(false);
      }
    };
  
    const nextPage = () => {
      if (currentPage < Math.ceil(totalResults / itemsPerPage)) {
        setCurrentPage(prev => prev + 1);
        fetchResults();
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        fetchResults();
      }
    };

  return (
    <div className="searchbar-container">
      <section id="searchbar">
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          />
          <button type="submit" id="btn-icon"><AiOutlineSearch size={24} /></button>
        </form>
      </section>

      {loading && <p>Loading...</p>}
  
      {showResults && items.length > 0 && (
        <section id="results" className="results-dropdown" ref={resultsRef}>
          {items.map((item) => {
            // Determine the new product link based on the mapping
            const productId = productMapping[item.link];
            const newProductLink = productId ? `/product/${productId}` : item.link;

            // Remove "Xreart" from the title if it exists (Sorry Xreart, I will give credit to you in the product page)
            const cleanTitle = item.title.startsWith("Xreart") 
              ? item.title.replace("Xreart ", "") 
              : item.title;

            return (
              <div key={item.link} className="result-item">
                <section>
                  {item.pagemap.cse_thumbnail ? (
                    <img className="result-item-image" src={item.pagemap.cse_thumbnail[0].src} alt={cleanTitle} />
                  ) : (
                    <img src='https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg' alt="No Thumbnail" />
                  )}
                </section>
                <section>
                  <h3>{cleanTitle}</h3> {/* Use cleaned title (without the borrowed products actual company "Xreart" name)*/}
                  <a href={newProductLink} target="_blank" rel="noopener noreferrer">To Product -&gt;</a>
                </section>
              </div>
            );
          })}

          {/* Error message */}
          {error && <p>{error}</p>}
  
          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>&lt; Previous</button>
            <span>Page {currentPage} of {Math.ceil(totalResults / itemsPerPage)}</span>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(totalResults / itemsPerPage)}>Next &gt;</button>
          </div>
        </section>
      )}
    </div>
  );
}

export default SearchBar;
