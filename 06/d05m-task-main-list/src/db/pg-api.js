import pgClient from './pg-client';

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));
    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(`
                SELECT t.id, t.content, t.tags, t.user_id AS "userId",
                t.approach_count AS "approachCount",
                t.is_private AS "isPrivate", t.created_at AS "createdAt",
                u.id AS "author_id",
                u.username AS "author_username",
                u.first_name AS "author_firstName",
                u.last_name AS "author_lastName",
                u.created_at AS "author_createdAt"
                FROM azdev.tasks t
                JOIN azdev.users u ON (t.user_id = u.id)
                WHERE is_private = FALSE
                ORDER BY t.created_at DESC
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
        approachList: async (taskId) => {
            const pgResp = await pgQuery(`
                SELECT id, content, user_id AS "userId", task_id AS "taskId",
                vote_count AS "voteCount", created_at AS "createdAt"
                FROM azdev.approaches
                WHERE task_id = $1
                ORDER BY vote_count DESC, created_at DESC
            `, {
                $1: taskId,
            });
            return pgResp.rows;
        },
    };
};
export default pgApiWrapper;