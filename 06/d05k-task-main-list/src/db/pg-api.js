import pgClient from './pg-client';

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));
    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(`
                SELECT id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt"
                FROM azdev.tasks
                WHERE is_private = FALSE
                ORDER BY created_at DESC
                LIMIT    100
            `);
            return pgResp.rows;
        },
    };
};
export default pgApiWrapper;