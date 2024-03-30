import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { useCallback, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, DataTable, HelperText, Searchbar } from "react-native-paper";
import { LABELS, PATHS } from "../constants";
import URLS from "../constants/Host";
import { useStore } from "../hooks/useStore";

interface IProductSearchResult {
  productName: string;
  id: number;
}

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<IProductSearchResult[]>(
    [],
  );
  const [page, setPage] = useState(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(5);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigation();
  const { product } = useStore();
  const searchRef = useRef(null);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, searchResults.length);

  const handleChange = (text: string) => {
    if (text === "") {
      clearSearch();
      return;
    }
    setSearchLoading(true);
    setSearch(text);
    handler();
    searchRef.current = text;
  };

  const clearSearch = () => {
    setSearch("");
    setSearchLoading(false);
    setSearchResults([]);
    setPage(0);
  };

  const searchProductInDb = async () => {
    try {
      const searchUrl = `${URLS.HOST}/api/products?filters[productName][$containsi]=${searchRef.current}&fields[0]=productName`;
      const response = await fetch(searchUrl);
      const data1 = await response.json();
      const data = JSON.parse(JSON.stringify(data1));
      const array = data.data.map((product) => {
        return {
          ...product.attributes,
          id: product.id,
        };
      }) as IProductSearchResult[];

      if (array.length === 0) {
        setSearchResults([]);
        return;
      }
      const removedDuplicates = new Set(array);
      setSearchResults(Array.from(removedDuplicates));
    } catch (e) {
      console.log(e);
    } finally {
      setSearchLoading(false);
    }
  };

  const handler = useCallback(debounce(searchProductInDb, 500), []);

  const handleProductClick = async (item: IProductSearchResult) => {
    const productDetails = await product.fetchProductByProductName(item.id);
    product.setScannedProduct(productDetails);
    product.setBarcode(productDetails.barcode);
    navigate.navigate(PATHS.PRODUCT_DETAILS as never);
  };

  const noResults =
    searchResults.length === 0 &&
    !searchLoading &&
    search !== "" &&
    searchRef.current !== "";

  return (
    <>
      <Searchbar
        value={search}
        onChangeText={handleChange}
        onClearIconPress={clearSearch}
        placeholder={LABELS.SEARCH_PRODUCT}
        loading={searchLoading}
      />
      {noResults && (
        <HelperText type="info">{LABELS.NO_SEARCH_RESULTS}</HelperText>
      )}
      {searchResults.length > 0 && (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product</DataTable.Title>
          </DataTable.Header>

          {searchResults.slice(from, to).map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Button
                  onPress={() => handleProductClick(item)}
                  style={styles.button}
                >
                  {item.productName}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(searchResults.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            label={`${from + 1}-${to} van ${searchResults.length}`}
          />
        </DataTable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
