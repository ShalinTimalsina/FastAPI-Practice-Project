import { useCallback, useEffect, useState } from "react";
import {
    createPost,
    deletePost,
    fetchPosts,
    updatePost,
} from "../api/posts";

/**
 * Small, focused hook to keep API logic out of components.
 */
export function usePosts({ autoLoad = true, initialLimit = null } = {}) {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(initialLimit);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState(null);

    const clearError = useCallback(() => setError(null), []);
    const clearNotice = useCallback(() => setNotice(null), []);

    // Auto-clear success messages after a short delay.
    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(null), 3000);
        return () => clearTimeout(t);
    }, [notice]);

    const load = useCallback(
        async (options = {}) => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPosts({
                    limit: options.limit ?? limit,
                });
                setPosts(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setLoading(false);
            }
        },
        [limit]
    );

    useEffect(() => {
        if (autoLoad) load();
    }, [autoLoad, load]);

    const create = useCallback(
        async ({ title, content }) => {
            setBusy(true);
            setError(null);
            try {
                await createPost({ title, content });
                setNotice("Created");
                await load();
                return true;
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
                return false;
            } finally {
                setBusy(false);
            }
        },
        [load]
    );

    const update = useCallback(
        async (id, { title, content }) => {
            setBusy(true);
            setError(null);
            try {
                await updatePost(id, { title, content });
                setNotice("Updated");
                await load();
                return true;
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
                return false;
            } finally {
                setBusy(false);
            }
        },
        [load]
    );

    const remove = useCallback(
        async (id) => {
            setBusy(true);
            setError(null);
            try {
                await deletePost(id);
                setNotice("Deleted");
                await load();
                return true;
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
                return false;
            } finally {
                setBusy(false);
            }
        },
        [load]
    );

    return {
        posts,
        limit,
        setLimit,
        loading,
        busy,
        error,
        notice,
        clearError,
        clearNotice,
        load,
        create,
        update,
        remove,
    };
}
