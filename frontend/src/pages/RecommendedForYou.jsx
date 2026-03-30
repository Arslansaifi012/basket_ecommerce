


const RecommendedForYou = () => {
    const { products, token, backendUrl } = useContext(ShopContext);
    const [recProducts, setRecProducts] = useState([]);

    useEffect(() => {
        const fetchRecs = async () => {
            const res = await axios.post(backendUrl + '/api/activity/recently-viewed', { userId: token });
            if (res.data.success) {
                // Filter your global products state using the IDs from backend
                const filtered = products.filter(p => res.data.productIds.includes(p._id));
                setRecProducts(filtered);
            }
        };
        if (token) fetchRecs();
    }, [token, products]);

    if (recProducts.length === 0) return null;

    return (
        <div className="my-10">
            <Title text1="RECOMMENDED" text2="FOR YOU" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedForYou ;