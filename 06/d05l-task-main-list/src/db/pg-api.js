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
        userInfo: async (userId) => {
            const pgResp = await pgQuery(`
                SELECT id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
                FROM azdev.users
                WHERE id = $1
                ` , { $1: userId });
            return pgResp.rows[0];
        },
    };
};
export default pgApiWrapper;